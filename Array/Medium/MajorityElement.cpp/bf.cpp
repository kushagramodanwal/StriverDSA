#include <bits/stdc++.h>
using namespace std;

int main()
{
    int a[] = {1, 2, 1, 1, 3};
    int n = 5;

    for (int i = 0; i < n; i++)
    {
        int cnt = 0;

        for (int j = 0; j < n; j++)
        {
            if (a[i] == a[j])
                cnt++;
        }

        if (cnt > n / 2)
        {
            cout << "Majority element: " << a[i] << endl;
            return 0;
        }
    }

    cout << "No majority element" << endl;
    return 0;
}
