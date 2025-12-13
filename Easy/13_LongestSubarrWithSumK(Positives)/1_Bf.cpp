// Subarray is contiguous, subsequence is not.

#include <bits/stdc++.h>
using namespace std;

int main() {

    int arr[] = {1, 2, 3, 1, 1, 1, 1, 4, 2, 3};
    int n = 10;
    int K = 3;   
    int len = 0;

    for (int i = 0; i < n; i++) {
        for (int j = i; j < n; j++) {
            int sum = 0;
            for (int k = i; k <= j; k++) {
                sum += arr[k];
            }
            if (sum == K) {
                len = max(len, j - i + 1);
            }
        }
    }

    cout << len << endl;
    return 0;
}

// o(n cube ) hai isliye khrab hai

// o(n square) try kro niche de rkha hai 








#include <bits/stdc++.h>
using namespace std;

int main()
{
    int arr[] = {1, 2, 3, 1, 1, 1, 1, 4, 2, 3};
    int n = 10;
    int K = 3;
    int len = 0;

    for (int i = 0; i < n; i++)
    {
        int sum = 0;
        for (int j = i; j < n; j++)
        {
            sum += arr[j];
            if (sum == K)
            {
                len = max(len, j - i + 1);
            }
        }
    }

    cout << len << endl;
    return 0;
}
