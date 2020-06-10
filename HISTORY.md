# History

## v6.6.0 2020 June 10

-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)

## v6.5.0 2020 June 10

-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)

## v6.4.0 2020 May 22

-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)

## v6.3.0 2020 May 21

-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)

## v6.2.0 2020 May 12

-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)

## v6.1.0 2020 May 11

-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)

## v6.0.0 2020 May 8

-   Converted from JavaScript to TypeScript
-   Breaking Change: `require('caterpillar-human')` is now `require('caterpillar-human').default`
    -   No change necessary if are using import for modules or doing `require('caterpillar-human').create()`
-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)

## v5.1.0 2020 May 4

-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)

## v5.0.0 2020 March 26

-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)
-   Minimum required node version changed from `node: >=8` to `node: >=10` to keep up with mandatory ecosystem changes

## v4.5.0 2019 December 9

-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)

## v4.4.0 2019 December 6

-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)

## v4.3.0 2019 December 1

-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)

## v4.2.0 2019 December 1

-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)

## v4.1.0 2019 December 1

-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)

## v4.0.0 2019 November 18

-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)
-   Minimum required node version changed from `node: >=0.12` to `node: >=8` to keep up with mandatory ecosystem changes

## v3.2.0 2019 November 13

-   Updated dependencies, [base files](https://github.com/bevry/base), and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)

## v3.1.0 2019 January 1

-   Moved from Flow Type Comments to TypeScript JSDoc
-   Updated [base files](https://github.com/bevry/base) and [editions](https://editions.bevry.me) using [boundation](https://github.com/bevry/boundation)

## v3.0.0 2016 May 4

-   Converted from CoffeeScript to JavaScript
-   `depth` and `showHidden` properties now respected when converting objects to strings on node versions above 0.10
-   objects converted to strings will now be colorised is `color` config property is `true`
-   API is now simplified, the class is exported directly, and `createHuman` is now just `create`

## v2.1.2 2014 January 10

-   Updated dependencies

## v2.1.1 2013 October 23

-   Added `create` API to make life easier when doing one liners
-   Project meta data files are now maintained by [Projectz](https://github.com/bevry/projectz)

## v2.1.0 2013 May 6

-   Replaced [cli-color](https://github.com/medikoo/cli-color) with [ansicolors](https://github.com/thlorenz/ansicolors) and [ansistyles](https://github.com/thlorenz/ansistyles) for their lighter footprint and browser support
-   In debug mode, debug line will now be dimmed, rather than the message line being brighter
-   The debug line seperator is now also styled

## v2.0.2 2013 May 2

-   Fixed colors

## v2.0.1 2013 April 25

-   Node 0.8 support

## v2.0.0 2013 April 25

-   Extracted from the main caterpillar repository for the stream rewrite
