import {rest} from 'msw'

const handlers = [
  rest.get(
    process.env.REACT_APP_API_URL,
    async (req, res, ctx) => {
      return res(ctx.json({results: []}))
    },
  ),
]

export {handlers}
