# Recipe Agent 🍳

An intelligent AI-powered recipe generator built with Google Genkit that creates personalized recipes based on ingredients and dietary restrictions. The agent leverages web search capabilities to gather real-time information about ingredients and dietary requirements, ensuring accurate and relevant recipe suggestions.

## 📋 Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## ✨ Features

- **AI-Powered Recipe Generation**: Uses Google Gemini 2.5 Flash model to create creative and healthy recipes
- **Web Search Integration**: Leverages Tavily search API to gather real-time information about ingredients and dietary needs
- **Type-Safe Implementation**: Built with TypeScript for enhanced code quality and developer experience
- **Flexible Input**: Accepts main ingredient and optional dietary restrictions
- **Comprehensive Output**: Generates detailed recipes including:
  - Recipe title and description
  - Preparation and cooking times
  - Serving size
  - Complete ingredient list
  - Step-by-step instructions
  - Helpful cooking tips
- **Interactive UI**: Built-in Genkit developer UI for testing and debugging
- **Structured Schemas**: Zod-based input/output validation for reliability

## 🛠 Technologies

| Technology | Purpose | Version |
|------------|---------|---------|
| [Genkit](https://github.com/firebase/genkit) | AI framework for building flows and tools | ^1.20.0 |
| [Google Gemini API](https://ai.google.dev/) | AI model for recipe generation | Gemini 2.5 Flash |
| [Tavily](https://tavily.com/) | Web search API for ingredient research | ^0.5.12 |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe language | ^5.9.3 |
| [Zod](https://zod.dev/) | Schema validation | Included with Genkit |
| [dotenv](https://github.com/motdotla/dotenv) | Environment variable management | ^17.2.3 |

## 🏗 Architecture

The Recipe Agent follows a modular architecture:

```
┌─────────────┐
│   User      │
│   Input     │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────┐
│     Recipe Flow                  │
│  (recipeFlow.ts)                │
│                                  │
│  ┌────────────────────────────┐ │
│  │  AI Generation (Gemini)    │ │
│  │  - Temperature: 0.7        │ │
│  │  - Structured Output       │ │
│  └───────┬────────────────────┘ │
│          │                       │
│          ▼                       │
│  ┌────────────────────────────┐ │
│  │  Search Tool (Tavily)      │ │
│  │  - Web research            │ │
│  │  - Real-time data          │ │
│  └────────────────────────────┘ │
└──────────────┬──────────────────┘
               │
               ▼
       ┌──────────────┐
       │   Recipe     │
       │   Output     │
       └──────────────┘
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Genkit cli** `npm i -g genkit-cli`
- **API Keys**:
  - Google Gemini API key ([Get it here](https://ai.google.dev/))
  - Tavily API key ([Get it here](https://tavily.com/))

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd recipe-agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   touch .env
   ```

## ⚙️ Configuration

Add the following environment variables to your `.env` file:

```env
# Google Gemini API Configuration
GOOGLE_GENAI_API_KEY=your_google_gemini_api_key_here

# Tavily Search API Configuration
TAVILY_API_KEY=your_tavily_api_key_here
```

### Getting API Keys

**Google Gemini API:**
1. Visit [Google AI Studio](https://ai.google.dev/)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key to your `.env` file

**Tavily API:**
1. Visit [Tavily](https://tavily.com/)
2. Sign up for an account
3. Navigate to API settings
4. Generate an API key
5. Copy the key to your `.env` file

## 💻 Usage

### Using the Genkit Developer UI (Recommended)

The easiest way to test and interact with the Recipe Agent:

```bash
npm run genkit:ui
```

This will:
- Start the Genkit development server
- Open the interactive UI in your browser
- Watch for file changes and auto-reload
- Provide debugging tools and flow visualization

In the UI, you can:
1. Navigate to the `recipeFlow` flow
2. Enter your input (ingredient and restrictions)
3. Run the flow and see the generated recipe
4. View tool calls and intermediate steps

### Programmatic Usage

Edit `src/index.ts` to customize the recipe generation:

```typescript
import recipeFlow from "./flows/recipeFlow.ts";

async function main() {
  const result = await recipeFlow({
    ingredient: "Paneer",
    restrictions: "vegetarian",
  });

  console.log(result);
}

main().catch(console.error);
```

Run directly:
```bash
npx tsx src/index.ts
```

## 📁 Project Structure

```
recipe-agent/
├── src/
│   ├── flows/
│   │   └── recipeFlow.ts       # Main AI flow definition
│   ├── schemas/
│   │   └── recipeSchemas.ts    # Zod schemas for validation
│   ├── tools/
│   │   └── searchTool.ts       # Tavily web search tool
│   ├── types/
│   │   └── recipeTypes.ts      # TypeScript type definitions
│   ├── genkit.ts               # Genkit configuration
│   └── index.ts                # Entry point
├── .env                        # Environment variables (create this)
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── LICENSE                     # BSD-3-Clause license
└── README.md                   # This file
```

### Key Files Explained

- **`recipeFlow.ts`**: Defines the AI flow that orchestrates the recipe generation process
- **`searchTool.ts`**: Custom Genkit tool that wraps Tavily API for web searches
- **`recipeSchemas.ts`**: Zod schemas for input validation and output structure
- **`genkit.ts`**: Configures Genkit with Google Gemini plugin and model settings
- **`recipeTypes.ts`**: TypeScript interfaces for type safety

## 📚 API Reference

### RecipeFlow Input

```typescript
interface RecipeFlowInput {
  ingredient: string;        // Main ingredient for the recipe (required)
  restrictions?: string;     // Dietary restrictions (optional)
}
```

**Example:**
```typescript
{
  ingredient: "Chicken",
  restrictions: "gluten-free, low-carb"
}
```

### RecipeFlow Output

```typescript
interface RecipeFlowOutput {
  title: string;              // Recipe name
  description: string;        // Brief description
  prepTime: string;           // Preparation time
  cookTime: string;           // Cooking time
  servings: number;           // Number of servings
  ingredients: string[];      // List of ingredients with quantities
  instrictions: string[];     // Step-by-step cooking instructions
  tips: (string | undefined)[]; // Helpful cooking tips
}
```

**Example Output:**
```typescript
{
  title: "Creamy Paneer Tikka Masala",
  description: "A rich and flavorful vegetarian dish...",
  prepTime: "15 minutes",
  cookTime: "25 minutes",
  servings: 4,
  ingredients: [
    "400g paneer, cubed",
    "2 tablespoons vegetable oil",
    "1 large onion, finely chopped",
    // ...
  ],
  instrictions: [
    "Heat oil in a large pan over medium heat",
    "Add cumin seeds and let them crackle",
    // ...
  ],
  tips: [
    "For a richer flavor, marinate paneer for 30 minutes",
    "Garnish with fresh coriander before serving"
  ]
}
```

## 🌟 Examples

### Example 1: Basic Vegetarian Recipe

```typescript
const recipe = await recipeFlow({
  ingredient: "Tofu",
  restrictions: "vegetarian"
});
```

### Example 2: Multiple Dietary Restrictions

```typescript
const recipe = await recipeFlow({
  ingredient: "Salmon",
  restrictions: "keto, dairy-free, gluten-free"
});
```

### Example 3: No Restrictions

```typescript
const recipe = await recipeFlow({
  ingredient: "Beef"
  // No restrictions specified
});
```

### Example 4: Vegan Recipe

```typescript
const recipe = await recipeFlow({
  ingredient: "Chickpeas",
  restrictions: "vegan, oil-free"
});
```

## 🔧 Development

### Running in Development Mode

```bash
npm run genkit:ui
```

This command uses `tsx` with watch mode, so any changes to `.ts` files will automatically reload the application.

### TypeScript Configuration

The project uses TypeScript with ES modules. Key `tsconfig.json` settings ensure proper type checking and modern JavaScript features.

### Adding New Tools

To add a new tool:

1. Create a new file in `src/tools/`
2. Define the tool using `ai.defineTool()`
3. Specify input/output schemas with Zod
4. Implement the tool logic
5. Import and add to the tools array in `recipeFlow.ts`

### Modifying the Flow

Edit `src/flows/recipeFlow.ts` to:
- Change the AI prompt
- Add more tools
- Modify input/output schemas
- Adjust generation parameters

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code:
- Follows TypeScript best practices
- Includes proper type definitions
- Is well-documented
- Passes all linting checks

## 📄 License

This project is licensed under the BSD-3-Clause License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Ayush Muley**

---

<p align="center">Made with ❤️ and AI</p>
