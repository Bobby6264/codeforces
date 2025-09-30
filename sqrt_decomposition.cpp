#include<bits/stdc++.h>
using namespace std;

using lli = long long;
#define endl "\n"

void solve(){
    int n,q;
    cin>>n>>q;
    vector<int> arr(n);
    for(int i =0; i< n; i++){
        cin>>arr[i];
    }
    
    int len = sqrt(n+0.0);
    vector<int> b(len+1,1e9);
    for(int i =0; i<n ; i++){
        b[i/len]= min(b[i/len] , arr[i]);
    }
    while(q--){
        int l,r;
        cin>>l>>r;
        int ans = arr[l];
        if(l/len == r/len){
            for(int i = l; i<=r ; i++){
                ans = min(ans, arr[i]);
            }
        }else{
            for(int i = l; i< (l/len +1)*len ; i++){
                ans = min(ans, arr[i]);
            }
            int lc = l/len;int rc = r/len;
            
            for(int i =  lc +1; i< rc ; i++){
                ans = min(ans, b[i]);
            }
            for(int i = rc*len ; i<=r ; i++){
                ans = min(ans, arr[i]);
            }
        }
        cout<<ans<<endl;
    }
}

signed main(){
    int t = 1;
    // cin>>t;
    while(t--){
        solve();
    }
}