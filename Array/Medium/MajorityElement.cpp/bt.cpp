#include <bits/stdc++.h>
using namespace std;

int main()
{

    int a[] = {1, 2, 1, 1, 3};
    int n = 5;

    map<int, int> mpp;

    for (int i = 0; i < n; i++)
    {
        mpp[a[i]]++;
    }

    int maxx = INT_MIN;
    int temp = 0;

    for (auto it : mpp)
    {
        if (it.second > maxx)
        {
            maxx = it.second;
            temp = it.first;
        }
    }

    if (maxx > n / 2)
        cout << "Majority element: " << temp << endl;
    else
        cout << "No majority element" << endl;
    return 0;
}
