#include <bits/stdc++.h>
using namespace std;

int main()
{
    int t;
    cin >> t;

    while (t--)
    {
        int n;
        cin >> n;

        vector<int> a(n);
        for (int i = 0; i < n; i++)
        {
            cin >> a[i];
        }

        long long d = 0;
        for (int i = 1; i < n; i++)
        {
            d = gcd(d, a[i] - a[i - 1]);
        }

        int t = (a[n - 1] - a[0]) / d + 1;

        cout << t - n << endl;
    }

    return 0;
}
