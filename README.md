# helix.ts

[![GitHub Release](https://img.shields.io/github/v/release/mountayaapp/helix.ts)](https://github.com/mountayaapp/helix.ts/releases/latest)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

helix.ts is designed for consuming public-facing types exposed by services written
with helix.go.

## Example

A helix REST endpoint returns a GraphQL-spec compliant envelope: a success
response carries `data` (and optional `extensions.metadata`), while a 3xx/4xx/5xx
response carries an `errors` array (and optional `extensions.metadata`).
`Response<Metadata, Data>` is the discriminated union of both shapes — narrow
on the presence of `errors` to handle each case.

```typescript
import axios from "axios";

import type { Event } from "@mountayaapp/helix/event";
import type { Response } from "@mountayaapp/helix/integration/rest";

type Metadata = {
  event: Event;
};

type Data = {
  // ...
};

const { data: body } = await axios.get<Response<Metadata, Data>>("/anything");

if ("errors" in body) {
  // body.errors: ErrorEntry[]
  // body.extensions?.metadata?.event
} else {
  // body.data: Data | null
  // body.extensions?.metadata?.event
}
```

## License

Repository licensed under the [MIT License](./LICENSE.md).
