# vs-base-32

This is sample implementation of base 32 RFC-4648.

<br/>

## Usage

<br/>
# Base 32 encoder

```

import { base32Encode } from "vs-base-32";

const encodedString = base32Encode("Cat"); // "INQXI==="
```

<br/>
# Base 32 decoder

```

import { base32Decode } from "vs-base-32";

const decodedString = base32Decode("INQXI==="); // "Cat"

```
