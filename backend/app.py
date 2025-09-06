from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os
import pandas as pd
from werkzeug.utils import secure_filename
import re

app = Flask(__name__)
CORS(app)

DB_PATH = "data.db"
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# --- Save Excel to SQLite ---
def save_excel_to_db(file_path, table_name="uploaded_table"):
    conn = sqlite3.connect(DB_PATH)
    df = pd.read_excel(file_path)
    df.to_sql(table_name, conn, if_exists="replace", index=False)
    conn.close()
    return f"Table '{table_name}' created with {len(df)} rows."


# --- Get column names from uploaded table ---
def get_columns(table="uploaded_table"):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(f"PRAGMA table_info({table});")
    cols = [col[1] for col in cursor.fetchall()]
    conn.close()
    return cols


# --- English → SQL matcher ---
def english_to_sql(user_text: str) -> str:
    text = user_text.lower().strip()
    cols = get_columns()

    sql = "SELECT * FROM uploaded_table"  # default fallback

    # 1. Exact column-only requests
    for col in cols:
        if text == col.lower() or f"only {col.lower()}" in text or f"show {col.lower()}" in text:
            return f"SELECT {col} FROM uploaded_table"

    # 2. Multiple columns ("show topic and completed")
    if " and " in text:
        requested = []
        for col in cols:
            if col.lower() in text:
                requested.append(col)
        if requested:
            return f"SELECT {', '.join(requested)} FROM uploaded_table"

    # 3. Count rows
    if "count" in text:
        return "SELECT COUNT(*) as total_rows FROM uploaded_table"

    # 4. Highest / Max
    if "highest" in text or "max" in text or "top" in text:
        for col in cols:
            if col.lower() in text:
                return f"SELECT * FROM uploaded_table ORDER BY {col} DESC LIMIT 1"

    # 5. Lowest / Min
    if "lowest" in text or "min" in text:
        for col in cols:
            if col.lower() in text:
                return f"SELECT * FROM uploaded_table ORDER BY {col} ASC LIMIT 1"

    # 6. Average
    if "average" in text or "mean" in text:
        for col in cols:
            if col.lower() in text:
                return f"SELECT AVG({col}) as average_{col} FROM uploaded_table"

    # 7. Sum / Total
    if "sum" in text or "total" in text:
        for col in cols:
            if col.lower() in text:
                return f"SELECT SUM({col}) as sum_{col} FROM uploaded_table"

    # 8. Conditional WHERE (e.g. "where completed > 0")
    match = re.search(r"where (.+)", text)
    if match:
        condition = match.group(1)
        return f"SELECT * FROM uploaded_table WHERE {condition}"

    return sql


# --- Upload Excel Route ---
@app.route("/upload_excel", methods=["POST"])
def upload_excel():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    message = save_excel_to_db(filepath)

    # Preview first 5 rows
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM uploaded_table LIMIT 5")
    rows = cursor.fetchall()
    columns = [desc[0] for desc in cursor.description]
    conn.close()

    return jsonify({
        "message": message,
        "columns": columns,
        "preview": {"columns": columns, "rows": rows}
    })


# --- Query Route ---
@app.route("/query", methods=["POST"])
def query():
    data = request.get_json()
    user_text = data.get("query", "")

    try:
        sql = english_to_sql(user_text)

        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(sql)
        rows = cursor.fetchall()
        columns = [desc[0] for desc in cursor.description]
        conn.close()

        return jsonify({
            "sql": sql,
            "result": {"columns": columns, "rows": rows}
        })
    except Exception as e:
        print("Query error:", e)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
