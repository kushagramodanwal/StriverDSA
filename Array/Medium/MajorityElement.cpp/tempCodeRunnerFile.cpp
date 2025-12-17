#include <bits/stdc++.h>
using namespace std;

int main()
{

    int a[] = {1, 2, 1, 1, 3};
    int n = 5;

    int cnt = 0;
    int el;
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
        int cnt1 = 0;
        for (int i = 0; i < n; i++)
        {
            if (a[i] == el)
                cnt1++;
        }
        if (cnt1 > n / 2)
        {
            return el;
        }

        return -1;
    }

   
}