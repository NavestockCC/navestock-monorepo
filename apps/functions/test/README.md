# Functions Testing

# Kill Emulator Ports
##  Function Port: lsof -t -i tcp:5001 | xargs kill
## Firestore Port: lsof -t -i tcp:8080 | xargs kill
## Pub/Sub Port: lsof -t -i tcp:8085 | xargs kill
