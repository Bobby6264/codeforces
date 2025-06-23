#include<bits/stdc++.h>
using namespace std;
using lli = long long ;

lli mod = 1e9+7;


lli modadd(lli a , lli b, lli m = mod){
    lli sum = ((a%m)+(b%m))%m;
    return sum;
}

lli modsub ( lli a , lli b , lli m){
    lli sub = ((a%m)-(b%m) +m) % m;
    return sub;
}

lli modmul( lli a , lli b , lli m){
    lli mul = ((a%m) * (b%m))%m;
    return mul;
}


int main()
{
    lli a,b;
    cin>>a>>b;
    cout<<"mod add : "<<modadd(a,b,mod)<<endl<<"mod sub : "<<modsub(a,b,mod)<<endl<<"mod mul : "<<modmul(a,b,mod)<<endl;
    return 0;
}
