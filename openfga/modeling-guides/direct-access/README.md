# Direct Access

Modeling Guides: [Direct Access](https://openfga.dev/docs/modeling/direct-access)

## Setup OpenFGA

- OpenFGA: [server](../../server/README.md)
- SDK Client: [node](../../client/node/README.md)

```dsl
model
  schema 1.1
type user
type document
  relations
    define owner: [user]
    define reader: [user]
    define writer: [user]
```

## Step by Step

### Create a relation types

[update_relationship.js](update_relationship.js)

```js
await fgaClient.write({
  writes: {
    tuple_keys: [{ user: "user:bob", relation: "writer", object: "document:meeting_notes.doc" }],
  },
  authorization_model_id: "01GSMNE0TJAGF9GQYV91W6B9G5",
});
```

```bash
node update_relationship.js
```

### Check That The Relationship Exists

#### Return True

[check_true.js](check_true.js)

```js
const { allowed } = await fgaClient.check({
  authorization_model_id: "01GSMNE0TJAGF9GQYV91W6B9G5",
  tuple_key: {
    user: "user:bob",
    relation: "writer",
    object: "document:meeting_notes.doc",
  },
});
```

```bash
node check_true.js

allowed true
```

#### Return False

[check_false.js](check_false.js)

```js
const { allowed } = await fgaClient.check({
  authorization_model_id: "01GSMNE0TJAGF9GQYV91W6B9G5",
  tuple_key: {
    user: "user:bob",
    relation: "reader",
    object: "document:meeting_notes.doc",
  },
});
```

```bash
node check_false.js

allowed false
```
