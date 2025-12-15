#include <bits/stdc++.h>
using namespace std;

int main()
{
    int n;
    cin >> n;

    int arr[n];
    for (int i = 0; i < n; i++)
    {
        cin >> arr[i];
    }
    // pre compute
    map<int, int> mpp;
    for (int i = 0; i < n; i++)
    {
        mpp[arr[i]]++;
    }

    for (auto it : mpp)
    {
        cout << it.first << "->" << it.second << endl;
    }
 
    int q;
    cin >> q;
    while (q--)
    {
        int number;
        cin >> number;
        // fetch
        cout << mpp[number] << endl;
    }

    return 0;
}

// map stores  all the values in a sorted manner

// map:
// - keys sorted order me store hoti hain
// - internally Red-Black Tree
// - insert / search / delete → O(log n)
// - order maintain hota hai
// - thoda slow but stable

// unordered_map:
// - keys ka koi order nahi hota
// - internally Hash Table
// - insert / search / delete → O(1) average
// - bahut fast
// - worst case O(n) (rare)
