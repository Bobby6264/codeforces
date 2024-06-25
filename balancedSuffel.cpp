#include <bits/stdc++.h>
using namespace std;

int main()
{
    string s;
    cin >> s;
    int n = s.size();
    vector<int> prebal(n);
    int open = 0;
    int close = 0;
    for (int i = 0; i < n; i++)
    {
        prebal[i] = open - close;
        if (s[i] == '(')
        {
            open++;
        }
        else
        {
            close++;
        }
    }
    map<int, vector<char>> mpp;
    for (int i = 0; i < n; i++)
    {
        mpp[prebal[i]].push_back(s[i]);
    }
    string ans = "";
    for (const auto &it : mpp)
    {
        vector<char> val = it.second;
        while (!val.empty())
        {
            ans += val.back();
            val.pop_back();
        }
    }
    cout << ans << endl;
}