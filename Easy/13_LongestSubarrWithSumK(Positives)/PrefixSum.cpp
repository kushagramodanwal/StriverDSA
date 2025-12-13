#include <bits/stdc++.h>
using namespace std;

int a[100005];
long long pf[100005];

int main() {
    int n;
    cin >> n;

    // 1-based indexing kroge prefix sum me to shi rhega
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        pf[i] = pf[i - 1] + a[i];
    }

    int q;
    cin >> q;

    while (q--) {
        int l, r;
        cin >> l >> r;
// maanlo tumhe l se r tk ka sum to ye kro 
        long long sum = pf[r] - pf[l - 1];
        cout << sum << endl;
    }

    return 0;
}
