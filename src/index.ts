import server from "./server";

/******************************************************************************
/*
/*                                START SERVER
/*
/******************************************************************************/

const port = process.env.PORT || 3000;

server.listen(port, () =>
  console.log(
    `App listening on port ${port}!`
  )
);
