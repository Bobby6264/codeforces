// Author: Karan Kumar Sethi
#include <bits/stdc++.h>
using namespace std;

#define endl "\n" 
#define int long long
#define rep(i,n) for(ll i=0; i<n;i++)
#define repa(i,a,n) for(ll i=a; i<n; i++)
#define repab(i,a,n,b) for(ll i=a;i<n;i=i+b)
#define mod 1000000007
#define pb push_back
const int N = 2e5 + 20, inf = 1e9;

signed main()
{
#ifndef ONLINE_JUDGE
    freopen("input.txt", "r", stdin);
    freopen("output.txt", "w", stdout);
#endif

    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    int t;
    cin >> t;
    while (t--)
    {
        int n; 
        cin>> n;
        if(n%2==0){
            cout<<"Sakurako"<<endl;
        }else{
            cout<<"Kosuke"<<endl;
        }
    }
}
