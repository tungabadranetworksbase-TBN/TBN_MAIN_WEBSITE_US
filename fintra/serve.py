"""Local static server for the Fintra export. Adds no-store so edits show up immediately."""
from http.server import SimpleHTTPRequestHandler, test
import sys

class H(SimpleHTTPRequestHandler):
    extensions_map = {**SimpleHTTPRequestHandler.extensions_map, ".mjs": "text/javascript"}
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

if __name__ == "__main__":
    test(H, port=int(sys.argv[1]) if len(sys.argv) > 1 else 8321, bind="127.0.0.1")
