// Author: Karan Kumar Sethi
#include <bits/stdc++.h>
using namespace std;

#define endl "\n"
typedef long long ll;
#define rep(i, n) for (ll i = 0; i < n; i++)
#define repa(i, a, n) for (ll i = a; i < n; i++)
#define repab(i, a, n, b) for (ll i = a; i < n; i = i + b)
#define mod 1000000007
#define pb push_back
const ll N = 2e5 + 20, inf = 1e9;

int n;
int arr[100100];
int t[400400];

void build(int index, int l, int r)
{
    if (l == r)
    {
        t[index] = arr[l];
        return;
    }
    int mid = l + (r - l) / 2;
    // building the left tree
    build(2 * index, l, mid);
    // building the right tree
    build(2 * index + 1, mid + 1, r);
    // combining the results
    t[index] = t[2 * index] + t[2 * index + 1];
}

void update(int index, int l, int r, int x, int v)
{
    if (x < l || x > r)
    {
        return; // out of range
    }
    if (l == r)
    {
        arr[x] = v;   // update the value in the original array
        t[index] = v; // update the segment tree
        return;
    }
    int mid = l + (r - l) / 2;

    update(2 * index, l, mid, x, v); // update in the left subtree

    update(2 * index + 1, mid + 1, r, x, v); // update in the right subtree
    t[index] = t[2 * index] + t[2 * index + 1]; // update the current node
}

int query(int index , int l , int r, int lq, int rq){
    if(l >rq || r <lq){return 0;} // out of range
    if(l >= lq && r <= rq){return t[index];}
    int mid = l + (r - l) / 2;
    int leftSum = query(2 * index, l, mid, lq, rq); // query in the left subtree    
    int rightSum = query(2 * index + 1, mid + 1, r, lq, rq); // query in the right subtree
    return leftSum + rightSum; // combine the results
}

void solve()
{
    cin >> n;
    for (int i = 0; i < n; i++)
    {
        cin >> arr[i];
    }
    build(1, 0, n - 1); // node 1 actually contains the whole array
    int q;
    cin >> q;
    while (q--)
    {
        int ch;
        cin >> ch;
        if (ch == 1)
        {
            // update operation
            int x, v;
            cin >> x >> v;
            update(1, 0, n - 1, x, v); // x is 0-based index
        }
        else
        {
            int l, r;
            cin >> l >> r;
            query(1, 0, n-1, l, r); // l and r are 0-based indices
        }
    }
}

signed main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    int t = 1;
    // cin >> t; // Uncomment this line if you want to read number of test cases
    while (t--)
    {
        solve();
    }
}
