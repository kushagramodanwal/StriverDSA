#include <bits/stdc++.h>
using namespace std;

int main()
{
    int a[] = {1, 2, 1, 3, 2};
    int n = 5;

    for (int i = 0; i < n; i++)
    {
        int cnt = 0;
        for (int j = 0; j < n; j++)
        {
            if (a[i] == a[j])
            {
                cnt++;
            }
        }
        cout << a[i] << " " << cnt << endl;
    }

    return 0;
}
