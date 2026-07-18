#!/bin/bash

# Configuration
INTERVAL=5 # Check interval in seconds
BRANCH="main" # Branch to monitor and push to

# Colors for nice output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}===================================================${NC}"
echo -e "${GREEN}   Git Automatic Sync Starter (git-sync.sh)${NC}"
echo -e "${BLUE}===================================================${NC}"
echo -e "Monitoring directory: $(pwd)"
echo -e "Interval: ${YELLOW}${INTERVAL} seconds${NC}"
echo -e "Target branch: ${YELLOW}${BRANCH}${NC}"
echo -e "Press ${RED}Ctrl+C${NC} to stop."
echo -e "${BLUE}===================================================${NC}"

while true; do
  # Check if there are any changes (modified, untracked, deleted, etc.)
  if [[ -n $(git status --porcelain) ]]; then
    echo ""
    echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')] Changes detected:${NC}"
    git status -s
    
    echo "Staging all changes..."
    git add -A
    
    COMMIT_MSG="Auto-commit: $(date '+%Y-%m-%d %H:%M:%S')"
    echo "Committing with message: '$COMMIT_MSG'..."
    git commit -m "$COMMIT_MSG"
    
    echo -e "Pushing to remote ${BLUE}origin/$BRANCH${NC}..."
    git push origin "$BRANCH"
    
    if [ $? -eq 0 ]; then
      echo -e "${GREEN}Successfully pushed to GitHub!${NC}"
      echo "GitHub Pages deployment should begin shortly."
    else
      echo -e "${RED}Error: Failed to push to GitHub.${NC}"
      echo "Please check your network connection or repository permissions."
    fi
    echo -e "${BLUE}---------------------------------------------------${NC}"
  fi
  
  sleep $INTERVAL
done
