import os, json
from flask import Flask, jsonify, send_from_directory, abort

app = Flask(__name__)
DATA_DIR = os.path.dirname(__file__)

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})

@app.route("/api/domains", methods=["GET"])
def list_domains():
    with open(os.path.join(DATA_DIR, "domains.json")) as f:
        return jsonify(json.load(f))

@app.route("/api/domains/<domain_id>", methods=["GET"])
def get_domain(domain_id):
    with open(os.path.join(DATA_DIR, "domains.json")) as f:
        manifest = json.load(f)

    if domain_id in manifest:
        return send_from_directory(DATA_DIR, f"{domain_id}.json", mimetype="application/json")
    else:
        abort(404, description="Domain not found")


# … your existing imports and routes …


if __name__ == "__main__":
    # debug=True gives you auto-reload on changes and better error pages
    app.run(debug=True, host="0.0.0.0", port=5000)
