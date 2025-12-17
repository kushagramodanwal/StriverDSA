#include <bits/stdc++.h>
using namespace std;

int main()
{
    int a[] = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    int n = 9;

    int maxSum = INT_MIN;

    for (int i = 0; i < n; i++)          // start
    {
        for (int j = i; j < n; j++)      // end
        {
            int currSum = 0;
            for (int k = i; k <= j; k++) // sum
            {
                currSum += a[k];
            }
            maxSum = max(maxSum, currSum);
        }
    }

    cout << maxSum << endl;
    return 0;
}
