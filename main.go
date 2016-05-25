package main

import (
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", play)
	log.Println("Listening on :8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func play(w http.ResponseWriter, r *http.Request) {
	log.Println(r.RequestURI)
	switch r.RequestURI {
	case "/":
		http.Redirect(w, r, "play#12345", http.StatusFound)
	case "/play":
		http.ServeFile(w, r, "./index.html")
	default:
		http.FileServer(http.Dir("./")).ServeHTTP(w, r)
	}
}
