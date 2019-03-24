# Introduction
Koplio is a simple clone of Trello, built entirely using vanilla Javascript and Web Components without external libraries.
The API server used for the backend is a `json-server` that is watching a json file: `db.json`.

Some scripts are added to `package.json` to allow easy starting and running the application.
See [Installation](#Installation) for more information.

# Installation

##### Basic Start
To start the server, run `npm start` in your terminal console.

##### Serve on Network (with Web Server)
To serve the server on your machine, listening to `0.0.0.0`, port `8000`, run `npm run serve` in your terminal console.
*Note:* Modify `host.js` to point to your API server if it is not running on `http://localhost:3000`

##### API Server on Network
To serve the `json-server` over network, run `npm run startServer` in your terminal console.


It will open the `index.html` file on your default browser, and start the `json-server` API server.
Starting the server might take some time as it is scripted to use `npx` to download and run immediately so there will be some download time involved.

# Features
##### Columns
Trello Columns within a board are implemented in a similar but simplified manner.
Basic CRUD operations on the columns are supported.

**Parameters of Columns:**
- title (required): Title of the column. Empty title will default to 'Untitled Column'

**Supported Operations:**
- List all columns
- Add/Create card column
- Modify column
- Delete column

##### Cards
Cards can be managed within columns.
Basic CRUD operations on the cards as well as some extended operations are supported.

**Parameters of Cards:**
- title (required): Title of the card. Empty title will default to 'Untitled Card'
- description (optional): Multiline description of the card

**Supported Operations:**
- List all cards
- Add/Create new card
- Modify card
- Delete card
- Move card to another column (Drag and Drop)
- Search/Filter cards (based on title and description, case-insensitive)

# Components
### Container Label
The Title Label for `Koplio`

### Container Searchbar
The Web component for the searchbar to search and filter cards.
##### Attributes
`onSearchText`:`(text) => {}`: Callback method triggered on textbox text change.

### Card Container
The body for columns and cards.
This container is horizontally scrollable with custom-styled scrollbar.
##### Attributes
`columns`:`Array` - Array of `Container Column` components.
##### Methods
`search(text)` - Search and Filter content within component

### Container Column
A column container to store card data.
This container has a width of `250px` and expands vertically as more data are added to the container, allowing a seamless view on mobile.
##### Methods
`search(text)` - Search and Filter content within component

### Column Adder
A temporary column used to add new columns.
##### Attributes
`onAddColumn`:`(title) => {}` - Callback method on column add

### Column Data
Data column with card components inside.
##### Attributes
`columnId`:`Number` - Id of the column
`ondelete`:`() => {}` - Callback method on column delete
##### Methods
`search(text)` - Search and Filter content within component

### Column Data Title
Title Label for the column. This title comes from `column.title`.

### Card Item
Component to display card information.
This component allows click to expand for card data modification.
##### Attributes
`card`:`Object` - Card data as obtained by API, [see Cards](#Cards)
`onsave`:`(card) => {}` - Callback method on card information change save
`ondelete`:`(card) => {}` - Callback method on card delete
##### Methods
`searchOk(text)` - Search and Filter card content (title and description) within component, case-insensitive

### Card Item Adder
A temporary card used to add new cards
##### Attributes
`onadd`:`(card) => {}` - Callback method on card add

# Data Structure
### Columns
```
{
    id: Number,
    title: String
}
```

### Cards
```
{
    id: Number,
    title: String,
    description: String,
    columnId: Number (key for Column object)
}
```