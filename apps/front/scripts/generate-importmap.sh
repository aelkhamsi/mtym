#!/usr/bin/env bash
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm exec 20 pnpm exec payload generate:importmap