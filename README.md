# npm-install-doist-todoist-mcp

Minimal npm package showing how to install and wire `@doist/todoist-mcp` into an AI app.

## Install

```bash
npm install
```

## Usage

```js
import { TodoistApi } from '@doist/todoist-sdk'
import { streamText } from 'ai'
import { createTodoistTools } from 'npm-install-doist-todoist-mcp'

const client = new TodoistApi(process.env.TODOIST_API_KEY)

const result = streamText({
  model: yourModel,
  system: 'You are a helpful Todoist assistant',
  tools: createTodoistTools(client),
})
```

You can also import the raw tools and wrapper helper directly:

```js
import { addTasks, findTasksByDate, wrapTodoistTool } from 'npm-install-doist-todoist-mcp'
```