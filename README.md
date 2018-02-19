Detect Liberty

Rule of GO: 

- Start with black, after placing one piece of stone at any of the intersection of the grid, 
the other player can do the same but cannot place on the intersections that are already occupied by stone.

- Winning State: Until there is no more available move, 
which side occupies more space of the grid wins.

- Liberty: If a piece or a group of pieces' four directions are surrounded by opponent's pieces, 
this or this group of pieces would have no liberty. 
In this case, pieces without liberty will be taken out of the game.

Detailed method:
Checking the liberty of one piece of stone can be achieved by using a for loop through (x-1, y),  (x+1, y),  (x, y-1), and (x, y+1) to see if all of these four intersections are opponent's pieces or the edge of the grid. If this is the case, this piece will have no liberty and therefore it will be removed from the game.

In order to check the liberty of a group of stones, I tried several methods. 
One of these attempts is to put all of the stones of this group in an array
(start from one piece and check if there is any same color piece on the up, down, left, or right of it. 
And then put them in this new array and start over this method on these new stones). 
But it ended up with a very odd behavior of the game. 

After many other attempts, I still could not find the solutions of detecting liberties of a group of pieces.


