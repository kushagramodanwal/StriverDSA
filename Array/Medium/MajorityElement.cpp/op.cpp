#include <bits/stdc++.h>
using namespace std;

int main()
{

    int a[] = {2, 1, 1, 3, 3, 3, 3, 4, 3, 4, 3};
    int n = 11;

    int cnt = 0;
    int el;

    // Phase 1: Find candidate

    for (int i = 0; i < n; i++)
    {
        if (cnt == 0)
        {
            cnt = 1;
            el = a[i];
        }
        else if (a[i] == el)
        {
            cnt++;
        }
        else
        {
            cnt--;
        }
    }

    // Phase 2: Verify candidate

    int cnt1 = 0;
    for (int i = 0; i < n; i++)
    {
        if (a[i] == el)
            cnt1++;
    }
    if (cnt1 > n / 2)
        cout << el << endl;
    else
        cout << -1 << endl;

    return 0;
}