#include <bits/stdc++.h>
using namespace std;

int main()
{
    vector<int> arr = {3, 5, 1, 9, 2};

    sort(arr.begin(), arr.end());

    cout << arr[arr.size() - 1];
    
    return 0;
}
