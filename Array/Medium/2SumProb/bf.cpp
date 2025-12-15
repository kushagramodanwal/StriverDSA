#include <bits/stdc++.h>
using namespace std;

int main()
{
    vector<int> arr = {2, 7, 11, 15};
    int target = 9;

    unordered_map<int, int> mpp;

    for (int i = 0; i < arr.size(); i++)
    {
        int current = arr[i];
        int more = target - current;

        // check if required number already exists
        if (mpp.find(more) != mpp.end())
        {
            cout << "Pair found at indices: "
                 << mpp[more] << " and " << i << endl;
            return 0;
        }

        // store current number in map
        mpp[current] = i;
    }

    cout << "No pair found";
    return 0;
}
 