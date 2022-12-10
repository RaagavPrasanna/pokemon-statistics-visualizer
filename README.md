# 520-Project-Prasanna-Catriel-Obadia

This project uses pokeapi.co to gather, compare and visualise Pokemon stats.

The user is presented with a list of every Pokemon available. After selecting one, the user can compare that Pokemon's stats to the others' using a variety of different graphs.

![Alt](./image.png "image")

## Performance
On an unthrottled network, the site loads in ~800 milliseconds. Caching the page brings subsequent loads to ~550 milliseconds. The largest wait is for the pokemon data which takes ~350 milliseconds but does not affect the TTI.

On a fast 3G network, the site loads in ~ 2700 milliseconds. Caching the page brings subsequent loads to ~2500 milliseconds. The largest wait is for the background and favicon which takes ~1100 milliseconds and affects the TTI.
