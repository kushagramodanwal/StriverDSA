#include <bits/stdc++.h>
using namespace std;

int main()
{
    int a[] = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    int n = 9;

    int currSum = 0;
    int maxSum = INT_MIN;

    for (int i = 0; i < n; i++)
    {
        currSum += a[i];
        maxSum = max(maxSum, currSum);

        if (currSum < 0)
            currSum = 0;
    }

    cout << maxSum << endl;
    return 0;
}
