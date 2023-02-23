# STELLAR

## An hex-tile map exploration

Current preview

![](screenshot.png)

### Roadmap

##### Project initialization

-   [x] readme file
-   [x] random map creation
-   [x] hex and geom classes core structure
-   [x] pixijs rendering
-   [x] add eslint
-   [x] add prettier
-   [x] add unit tests

##### Data persistence

-   [ ] save map
-   [x] load map
-   [ ] save avatar settings
-   [ ] load avatar settings

##### Avatar control

-   [ ] add a player
-   [ ] handle walkable characteristic
-   [ ] keyboard navigation
-   [ ] pathfinding
-   [ ] UI pathfinding

##### Map generation

-   [ ] random seed research
-   [ ] elevation
-   [ ] terrain
-   [ ] optimize map IO model
        provide metrics (computation time, size, ...)
        see https://www.xarg.org/2014/03/javascript-bit-array/
        see https://github.com/infusion/BitSet.js

##### Threejs

-   [ ] performance console
-   [ ] navigation debug UI logger
-   [ ] tiles rendering
-   [ ] elevation rendering
-   [ ] terrain rendering

##### Navigation

-   [ ] map exploration with drag and drop
-   [ ] map exploration with minimap
-   [ ] loopable map on X-axis
-   [ ] evaluate and prune displayed tiles depending on the viewport
-   [ ] crash rendering test

### Available commands

##### Installation

`yarn`

##### Development

`yarn dev`
