# AI Assistant

A test project demonstrating integration with LLM models through Ollama, currently using Deepseek-R1.

## Overview

This project is a simple Angular-based interface for testing:
- Interaction with local LLM models via Ollama
- Streaming responses implementation
- Basic conversational UI patterns
- Deepseek-R1 model capabilities

## Prerequisites

- [Ollama](https://ollama.ai/) installed locally
- Deepseek-R1 model installed via Ollama
- Node.js v18+ and npm

## Installation & Setup

1. **Install Ollama**
   ```bash
   # On macOS/Linux
   curl -fsSL https://ollama.ai/install.sh | sh

   # On Windows
   winget install ollama

2. **Install Deepseek-R1 model**
   ```bash
   ollama run deepseek-r1 or deepseek-r1:14b, based on how much your PC is powerful
3. **Set up Angular application**
  ```bash
  git clone https://github.com/[your-username]/AI-Assistant.git
  cd AI-Assistant
  npm install
  npm start
