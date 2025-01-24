# AI Assistant

A test project demonstrating integration with large language models (LLMs) through Ollama, currently using Deepseek-R1.

## Features

- Local LLM Integration: Demonstrates how to interact with local LLM models via Ollama
- Streaming Responses: Implements real-time streaming of model responses
- Conversational UI: Integrates basic conversational patterns for user interaction
- Deepseek-R1 Model: Showcases the capabilities of the Deepseek-R1 model

## Badges

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## Overview

This project provides a simple Angular-based interface to test various AI assistant functionalities. It focuses on integrating local LLM models using Ollama and demonstrates streaming responses, conversational UI patterns, and the capabilities of the Deepseek-R1 model.

## Prerequisites

To run this project, you need:

- [Ollama](https://ollama.ai/) installed locally
- Deepseek-R1 model installed via Ollama (deepseek-r1 or deepseek-r1:14b, depending on your system's power)
- Node.js v18+ and npm

## Installation & Setup

1. Install Ollama


Choose the appropriate installation method based on your operating system:

macOS/Linux

```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

Windows

```bash
winget install ollama
```

2. Install Deepseek-R1 Model


Install the model using Ollama. Select either `deepseek-r1` or `deepseek-r1:14b` based on your system's capabilities:

```bash
# For lighter usage
ollama run deepseek-r1

# For more powerful systems
ollama run deepseek-r1:14b
```

3. Set Up Project


Clone the repository and install dependencies:

```bash
git clone https://github.com/dalir-bajelani/AI-Assistant.git
cd AI-Assistant
npm install
npm start
```

## Contributing

Contributions are welcome! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) file for details on how to contribute.

## License

This project is MIT licensed. See the [LICENSE](LICENSE) file for details.

## Notes

- The project uses Angular for the frontend, providing a simple interface for testing AI assistant features.
- Streaming responses are implemented to demonstrate real-time interaction with the LLM model.
