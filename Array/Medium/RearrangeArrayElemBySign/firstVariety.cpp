#include <bits/stdc++.h>
using namespace std;

int main()
{
    vector<int> nums = {3, 1, -2, -5, 2, -4};
    int n = nums.size();

    vector<int> ans(n);
    int posIndex = 0, negIndex = 1;

    for (int i = 0; i < n; i++)
    {
        if (nums[i] < 0)
        {
            ans[negIndex] = nums[i];
            negIndex += 2;
        }
        else
        {
            ans[posIndex] = nums[i];
            posIndex += 2;
        }
    }

    // print answer
    for (int i = 0; i < n; i++)
    {
        cout << ans[i] << " ";
    }

    return 0;
}
