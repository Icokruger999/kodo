# Deploy UI to AWS Amplify

## Quick Deploy to Amplify

1. **Push to GitHub:**
```bash
cd c:\kodo\frontend
git init
git add .
git commit -m "Supply chain UI"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/supply-chain-ui.git
git push -u origin main
```

2. **Deploy on Amplify Console:**
- Go to https://console.aws.amazon.com/amplify
- Click "New app" > "Host web app"
- Connect GitHub
- Select repository and branch
- Click "Save and deploy"

## Update API with CORS

Upload new main.py with CORS:
```bash
# Copy main_with_cors.py to EC2 and restart
```

## Manual IAM Role (Since credentials are quarantined)

1. Go to IAM Console
2. Create role "SupplyChainBedrock"
3. Trust: EC2 service
4. Attach: AmazonBedrockFullAccess
5. Go to EC2 > i-0697142f14b9a852e
6. Actions > Security > Modify IAM role
7. Select "SupplyChainBedrock"
8. Restart API: `sudo docker restart supply_chain_api`

## Summary

- Email updated: ico@astutetech.co.za
- UI ready in: c:\kodo\frontend
- Deploy to Amplify or run locally: `npm install && npm run dev`
