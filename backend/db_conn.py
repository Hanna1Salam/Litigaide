from flask import Flask, request, jsonify, send_file
import mysql.connector
from io import BytesIO
from reportlab.pdfgen import canvas
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

# Database configuration
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "Hanna@sql1",
    "database": "legal"
}

@app.route("/generate_pdf", methods=["POST"])
def generate_pdf():
    try:
        # Parse the data from the request (React form data)
        data = request.json
        plaintiff_name = data.get("plaintiffName")
        plaintiff_address = data.get("plaintiffAddress")
        defendant_name = data.get("defendantName")
        defendant_address = data.get("defendantAddress")
        suit_type = data.get("suitType")
        jurisdiction = data.get("jurisdiction")
        suit_details = data.get("suitDetails")

        # Connect to the database
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        # Insert data into the database
        plaintiff_query = """INSERT INTO plaintiff_details (name, address) VALUES (%s, %s)"""
        cursor.execute(plaintiff_query, (plaintiff_name, plaintiff_address))
        plaintiff_id = cursor.lastrowid

        defendant_query = """INSERT INTO defendant_details (name, address) VALUES (%s, %s)"""
        cursor.execute(defendant_query, (defendant_name, defendant_address))
        defendant_id = cursor.lastrowid

        case_query = """INSERT INTO case_details (suit_type, jurisdiction, suit_details, plaintiff_id, defendant_id)
                        VALUES (%s, %s, %s, %s, %s)"""
        cursor.execute(case_query, (suit_type, jurisdiction, suit_details, plaintiff_id, defendant_id))

        # Commit the transaction
        connection.commit()

        # Generate PDF
        pdf_buffer = BytesIO()
        pdf = canvas.Canvas(pdf_buffer)

        # Add content to the PDF
        pdf.drawString(100, 800, "Civil Suit Details")
        pdf.drawString(100, 780, f"Plaintiff Name: {plaintiff_name}")
        pdf.drawString(100, 760, f"Plaintiff Address: {plaintiff_address}")
        pdf.drawString(100, 740, f"Defendant Name: {defendant_name}")
        pdf.drawString(100, 720, f"Defendant Address: {defendant_address}")
        pdf.drawString(100, 700, f"Suit Type: {suit_type}")
        pdf.drawString(100, 680, f"Jurisdiction: {jurisdiction}")
        pdf.drawString(100, 660, f"Suit Details: {suit_details}")

        pdf.save()
        pdf_buffer.seek(0)

        # Close the database connection
        cursor.close()
        connection.close()

        # Return the PDF file
        return send_file(
            pdf_buffer,
            as_attachment=True,
            download_name="generated_suit.pdf",
            mimetype="application/pdf",
        )

    except mysql.connector.Error as db_err:
        print("Database error:", db_err)
        return jsonify({"error": "Database operation failed"}), 500

    except Exception as e:
        print("Error generating PDF:", e)
        return jsonify({"error": "Failed to generate PDF"}), 500


if __name__ == "__main__":
    app.run(debug=True)
