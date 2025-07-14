import os, json
from flask import Flask, jsonify, send_from_directory, abort

app = Flask(__name__)
DATA_DIR = os.path.dirname(__file__)

@app.route("/api/domains", methods=["GET"])
def list_domains():
    with open(os.path.join(DATA_DIR, "domains.json")) as f:
        return jsonify(json.load(f))

@app.route("/api/domains/<domain_id>", methods=["GET"])
def get_domain(domain_id):
    with open(os.path.join(DATA_DIR, "domains.json")) as f:
        manifest = json.load(f)
    entry = next((d for d in manifest if d["id"] == domain_id), None)
    if not entry:
        abort(404)
    return send_from_directory(DATA_DIR, entry["file"], mimetype="application/json")
