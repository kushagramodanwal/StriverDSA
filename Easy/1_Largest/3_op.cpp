#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> arr = {3, 5, 1, 9, 2};

    int maxi = arr[0];   
    for (int i = 1; i < arr.size(); i++) {
        if (arr[i] > maxi) {
            maxi = arr[i];
        }
    }

    cout << maxi;
    return 0;
}
