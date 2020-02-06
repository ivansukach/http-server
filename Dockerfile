# Container to compile the app
FROM golang:1.13-alpine AS httpserver

WORKDIR /build

COPY . .

RUN go build -o /app/http-server -mod=vendor
#o - output
# Final container image
FROM alpine:latest

WORKDIR /app

COPY --from=httpserver /app/http-server .

EXPOSE 8081

ENTRYPOINT ["/app/http-server"]
#i can call /app/http-server during the executing of program