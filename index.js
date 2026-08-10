import { addTasks, findTasksByDate } from '@doist/todoist-mcp'

export { addTasks, findTasksByDate }

export function wrapTodoistTool(tool, todoistClient) {
  return {
    ...tool,
    execute(args) {
      return tool.execute(args, todoistClient)
    },
  }
}

export function createTodoistTools(todoistClient) {
  return {
    findTasksByDate: wrapTodoistTool(findTasksByDate, todoistClient),
    addTasks: wrapTodoistTool(addTasks, todoistClient),
  }
}
