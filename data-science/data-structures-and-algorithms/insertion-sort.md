Q1: <br>
&emsp;&emsp;[22,27,16,2,18,6] &rarr; Position 0 and 1 are already sorted.<br> 
&emsp;&emsp;[22,16,27,2,18,6] &rarr; Position 2 (16) is swapped until sorted.<br> 
&emsp;&emsp;[16,22,27,2,18,6] <br> 
&emsp;&emsp;[16,22,2,27,18,6] &rarr; Position 3 (2) is swapped until sorted.<br> 
&emsp;&emsp;[16,2,22,27,18,6] <br> 
&emsp;&emsp;[2,16,22,27,18,6] <br> 
&emsp;&emsp;[2,16,22,18,27,6] &rarr; Position 4 (18) is swapped until sorted.<br> 
&emsp;&emsp;[2,16,18,22,27,6] <br>
&emsp;&emsp;[2,16,22,27,6,18] &rarr; Position 5 (6) is swapped until sorted.<br> 
&emsp;&emsp;[2,16,22,6,27,18] <br> 
&emsp;&emsp;[2,16,6,22,27,18] <br> 
&emsp;&emsp;[2,6,16,22,27,18] <br>
<br>
Q2: <br>
&emsp;&emsp;In the worst-case scenario, a reversed list, we need to iterate each item and swap each item k-1 time in order to move.<br>
&emsp;&emsp;Since there will be an average of (n-1)/2 swaps for each item, there will be a total of n*(n-1)/2 swaps.<br>
&emsp;&emsp;Incorporating n comparisons, n + n*(n-1)/2 = n*(n+1)/2<br>
&emsp;&emsp;Big-O notation will be &rarr; O(n<sup>2</sup>)<br>
<br>
Q3: <br>
&emsp;&emsp;Best case &rarr; 2<br>
&emsp;&emsp;Average case &rarr; 16, 18<br>
&emsp;&emsp;Worst case: &rarr; 27<br>
<br>
Q4: <br>
&emsp;&emsp;Getting number 18 after the list is sorted is average case because it is at the middle.<br>
<br>
Q5: <br>
&emsp;&emsp;Step 1: Checking Position 0 which is already sorted &rarr; [7,3,5,8,2,9,4,15,6]<br> 
&emsp;&emsp;Step 2: Position 1 is checked then it is swapped &rarr; [3,7,5,8,2,9,4,15,6]<br> 
&emsp;&emsp;Step 3: Position 2 is checked then it is swapped &rarr; [3,5,7,8,2,9,4,15,6]<br> 
&emsp;&emsp;Step 4: Position 3 is checked which is already sorted.&rarr; [3,5,7,8,2,9,4,15,6]<br> 
&emsp;&emsp;This actually results in 4 checks and 2 swaps which is total of 6 steps.<br> 