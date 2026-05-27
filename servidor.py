#!/usr/bin/env python3
"""
PyroShow Pro — Servidor local
Ejecuta este script para abrir la app correctamente en el navegador.

USO:
  python servidor.py

Luego abre:  http://localhost:8080/pages/app.html
"""
import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080
DIRECTORIO = os.path.dirname(os.path.abspath(__file__))

class CORSHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORIO, **kwargs)

    def end_headers(self):
        # Permitir peticiones a ESP32 locales
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def log_message(self, format, *args):
        pass  # Silenciar logs de peticiones

os.chdir(DIRECTORIO)

print("=" * 52)
print("  PyroShow Pro — Servidor local")
print("=" * 52)
print(f"  Directorio: {DIRECTORIO}")
print(f"  Puerto:     {PORT}")
print()
print("  Abre en el navegador:")
print(f"  http://localhost:{PORT}/pages/app.html")
print()
print("  Presiona Ctrl+C para detener")
print("=" * 52)

url = f"http://localhost:{PORT}/pages/app.html"

try:
    with socketserver.TCPServer(("", PORT), CORSHandler) as httpd:
        webbrowser.open(url)
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\n  Servidor detenido.")
except OSError as e:
    if "Address already in use" in str(e):
        print(f"\n  ERROR: El puerto {PORT} ya está en uso.")
        print(f"  Prueba: python servidor.py")
        PORT2 = PORT + 1
        print(f"  O cambia PORT = {PORT2} en este archivo.")
    else:
        print(f"\n  ERROR: {e}")
    sys.exit(1)
