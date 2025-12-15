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

    // precompute
    int hash[13] = {0};
    for (int i = 0; i < n; i++)
    {
        hash[arr[i]] += 1;
    }

    int q;
    cin >> q;
    while (q--)
    {
        int number;
        cin >> number;
        // fetch
        cout << hash[number] << endl;
    }

    return 0;
}

// LOCAL ARRAY (inside main):
// - STACK memory use hoti hai
// - Stack size limited (~8–16 MB)
// - SAFE size ≈ 1e5
// - 2–3e5 risky, usse zyada → runtime error / segfault
// - Local arrays default garbage values rakhte hain

// GLOBAL ARRAY (bahar main):
// - GLOBAL / HEAP memory use hoti hai
// - Automatically 0 se initialize hota hai
// - Zyada bada array allowed
// - SAFE size ≈ 1e7 (kabhi 2e7 bhi)
// 5e7 (~200 MB) → memory limit exceeded

// MEMORY RULE:
// - int = 4 bytes
// - size * 4 bytes = memory
// - Most platforms allow ≈ 256 MB total

// CHARACTER HASHING:
// - hash[26]  → lowercase letters
// - hash[256] → ASCII characters
// - Memory negligible, always safe

// WHEN NOT TO USE ARRAY HASHING:
// - Agar value range bahut bada ho (e.g. 1e9)
// - Use unordered_map instead

// QUICK RULE:
// - Local  → <= 1e5
// - Global → <= 1e7
// - Characters → 26 / 256
// - Huge range → unordered_map
