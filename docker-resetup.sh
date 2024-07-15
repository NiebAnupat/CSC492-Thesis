echo "Resetting docker containers..."
echo ""

echo "Stopping containers..."
docker compose down

echo ""
echo "Pulling latest images..."
docker compose pull

echo ""
echo "Building new containers..."
docker compose up -d --build

echo "Done!"