<?php
$config = json_decode(file_get_contents('config.json'), true);

function getLanyardData($discordId) {
    $url = "https://api.lanyard.rest/v1/users/" . $discordId;
    $options = [
        'http' => [
            'method' => 'GET',
            'header' => 'Content-Type: application/json',
            'timeout' => 10
        ]
    ];
    $context = stream_context_create($options);
    $response = @file_get_contents($url, false, $context);
    
    // Debug info
    $debug = [
        'url' => $url,
        'response_received' => $response !== false,
        'response_length' => $response ? strlen($response) : 0,
        'raw_response' => $response ? substr($response, 0, 500) : 'No response'
    ];
    
    if ($response === false) {
        return ['debug' => $debug, 'data' => null];
    }
    
    $decoded = json_decode($response, true);
    $debug['json_valid'] = $decoded !== null;
    $debug['decoded_data'] = $decoded;
    
    return ['debug' => $debug, 'data' => $decoded];
}

$lanyardResponse = null;
$lanyardData = null;
$discordInfo = [];
$debugInfo = [];

if (isset($config['discord']) && $config['discord']['enabled'] && !empty($config['discord']['discordId'])) {
    $lanyardResponse = getLanyardData($config['discord']['discordId']);
    $debugInfo = $lanyardResponse['debug'];
    $lanyardData = $lanyardResponse['data'];
    
    if ($lanyardData && isset($lanyardData['data']) && isset($lanyardData['success']) && $lanyardData['success']) {
        $data = $lanyardData['data'];
        
        // discord status
        if ($config['discord']['showStatus'] && isset($data['discord_status'])) {
            $discordInfo['status'] = $data['discord_status'];
        }
        
        // discord username
        if ($config['discord']['useUsername'] && isset($data['discord_user']['username'])) {
            $discordInfo['username'] = $data['discord_user']['global_name'];
        }
        
        // avatar
        if ($config['discord']['useAvatar'] && isset($data['discord_user']['avatar']) && !empty($data['discord_user']['avatar'])) {
            $discordInfo['avatar'] = 'https://cdn.discordapp.com/avatars/' . 
                $config['discord']['discordId'] . '/' . $data['discord_user']['avatar'] . '.png?size=256';
        }
    }
}

// loading additional JS files
function getJsFiles() {
    $jsFiles = [];
    $dir = 'morejs/';
    
    if (is_dir($dir)) {
        if ($dh = opendir($dir)) {
            while (($file = readdir($dh)) !== false) {
                if (pathinfo($file, PATHINFO_EXTENSION) === 'js') {
                    $jsFiles[] = $dir . $file;
                }
            }
            closedir($dh);
        }
    }
    
    return $jsFiles;
}

$jsFiles = getJsFiles();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($config['title']); ?></title>
    <link rel="stylesheet" href="assets/css/styles.css">
    <?php if (!empty($config['favicon'])): ?>
    <link rel="icon" href="<?php echo htmlspecialchars($config['favicon']); ?>" type="image/x-icon">
    <?php endif; ?>
    
    <!-- embeds -->
    <?php if (isset($config['embed'])): ?>
        <?php if (!empty($config['embed']['title'])): ?>
            <meta property="og:title" content="<?php echo htmlspecialchars($config['embed']['title']); ?>">
            <meta name="twitter:title" content="<?php echo htmlspecialchars($config['embed']['title']); ?>">
        <?php endif; ?>
        
        <?php if (!empty($config['embed']['description'])): ?>
            <meta property="og:description" content="<?php echo htmlspecialchars($config['embed']['description']); ?>">
            <meta name="twitter:description" content="<?php echo htmlspecialchars($config['embed']['description']); ?>">
        <?php endif; ?>
        
        <?php if (!empty($config['embed']['image_url'])): ?>
            <meta property="og:image" content="<?php echo htmlspecialchars($config['embed']['image_url']); ?>">
            <meta name="twitter:image" content="<?php echo htmlspecialchars($config['embed']['image_url']); ?>">
            <meta name="twitter:card" content="summary_large_image">
        <?php elseif (!empty($config['embed']['thumbnail_url'])): ?>
            <meta property="og:image" content="<?php echo htmlspecialchars($config['embed']['thumbnail_url']); ?>">
            <meta name="twitter:image" content="<?php echo htmlspecialchars($config['embed']['thumbnail_url']); ?>">
            <meta name="twitter:card" content="summary">
        <?php else: ?>
            <meta name="twitter:card" content="summary">
        <?php endif; ?>
        
        <?php if (!empty($config['embed']['author_name'])): ?>
            <meta property="og:site_name" content="<?php echo htmlspecialchars($config['embed']['author_name']); ?>">
        <?php endif; ?>
        
        <?php if (!empty($config['embed']['color'])): ?>
            <meta property="theme-color" content="<?php echo htmlspecialchars($config['embed']['color']); ?>">
        <?php endif; ?>
        
        <meta property="og:type" content="website">
    <?php endif; ?>
    
    <script src="assets/js/script.js" defer></script>
    <?php foreach ($jsFiles as $jsFile): ?>
    <script src="<?php echo htmlspecialchars($jsFile); ?>" defer></script>
    <?php endforeach; ?>
</head>
<body>
    <div class="space-bg" style="background-image: url('<?php echo htmlspecialchars($config['backgroundImage']); ?>')">
        <div class="nebula nebula-blue"></div>
        <div class="nebula nebula-teal"></div>
    </div>
    
    <div class="profile-card">
        <div class="profile-header">
            <div class="profile-img-container">
                <div class="profile-img">
                    <?php if (isset($discordInfo['avatar']) && $config['discord']['useAvatar']): ?>
                        <img src="<?php echo htmlspecialchars($discordInfo['avatar']); ?>" alt="Profile picture" onerror="this.src='<?php echo htmlspecialchars($config['profileImage']); ?>'">
                    <?php else: ?>
                        <img src="<?php echo htmlspecialchars($config['profileImage']); ?>" alt="Profile picture">
                    <?php endif; ?>
                </div>
                <?php if (isset($discordInfo['status']) && $config['discord']['showStatus']): ?>
                    <div class="status-ring status-<?php echo htmlspecialchars($discordInfo['status']); ?>"></div>
                <?php endif; ?>
            </div>
            <div class="profile-info">
                <h1 class="profile-name">
                    <?php if (isset($discordInfo['username']) && $config['discord']['useUsername']): ?>
                        <?php echo htmlspecialchars($discordInfo['username']); ?>
                    <?php else: ?>
                        <?php echo htmlspecialchars($config['name']); ?>
                    <?php endif; ?>
                </h1>
                
                <p class="profile-bio">
                    <?php echo nl2br(htmlspecialchars($config['bio'])); ?>
                </p>
            </div>
        </div>
        
        <div class="social-links">
            <?php foreach ($config['buttons'] as $button): ?>
                <?php if (isset($button['dropdown']) && $button['dropdown']): ?>
                    <div class="dropdown-container">
                        <button class="social-btn dropdown-toggle" data-dropdown="<?php echo htmlspecialchars($button['id']); ?>">
                            <?php if (!empty($button['icon'])): ?>
                                <span class="btn-icon"><img src="<?php echo htmlspecialchars($button['icon']); ?>" alt=""></span>
                            <?php endif; ?>
                            <?php echo htmlspecialchars($button['text']); ?>
                            <span class="dropdown-arrow">▼</span>
                        </button>
                        <div class="dropdown-content" id="dropdown-<?php echo htmlspecialchars($button['id']); ?>">
                            <?php foreach ($button['items'] as $item): ?>
                                <a href="<?php echo htmlspecialchars($item['url']); ?>" class="dropdown-item">
                                    <?php if (!empty($item['icon'])): ?>
                                        <span class="btn-icon"><img src="<?php echo htmlspecialchars($item['icon']); ?>" alt=""></span>
                                    <?php endif; ?>
                                    <?php echo htmlspecialchars($item['text']); ?>
                                </a>
                            <?php endforeach; ?>
                        </div>
                    </div>
                <?php elseif (isset($button['jsFunction'])): ?>
                    <button class="social-btn js-function" data-function="<?php echo htmlspecialchars($button['jsFunction']); ?>">
                        <?php if (!empty($button['icon'])): ?>
                            <span class="btn-icon"><img src="<?php echo htmlspecialchars($button['icon']); ?>" alt=""></span>
                        <?php endif; ?>
                        <?php echo htmlspecialchars($button['text']); ?>
                    </button>
                <?php else: ?>
                    <a href="<?php echo htmlspecialchars($button['url']); ?>" class="social-btn">
                        <?php if (!empty($button['icon'])): ?>
                            <span class="btn-icon"><img src="<?php echo htmlspecialchars($button['icon']); ?>" alt=""></span>
                        <?php endif; ?>
                        <?php echo htmlspecialchars($button['text']); ?>
                    </a>
                <?php endif; ?>
            <?php endforeach; ?>
        </div>
    </div>
    
    <?php if (isset($_GET['debug'])): ?>
    <div style="position: fixed; bottom: 10px; left: 10px; background: rgba(0,0,0,0.9); color: white; padding: 15px; border-radius: 8px; font-family: monospace; font-size: 11px; max-width: 400px; max-height: 80vh; overflow-y: auto; z-index: 9999;">
        <strong style="color: #00ff00;">Debug Info:</strong><br><br>
        
        <strong style="color: #ffff00;">Discord ID:</strong> <?php echo htmlspecialchars($config['discord']['discordId']); ?><br>
        <strong style="color: #ffff00;">API URL:</strong> <?php echo isset($debugInfo['url']) ? htmlspecialchars($debugInfo['url']) : 'Not set'; ?><br>
        <strong style="color: #ffff00;">Response Received:</strong> <?php echo isset($debugInfo['response_received']) ? ($debugInfo['response_received'] ? '✅ Yes' : '❌ No') : 'Unknown'; ?><br>
        <strong style="color: #ffff00;">Response Length:</strong> <?php echo isset($debugInfo['response_length']) ? $debugInfo['response_length'] . ' bytes' : 'Unknown'; ?><br>
        <strong style="color: #ffff00;">JSON Valid:</strong> <?php echo isset($debugInfo['json_valid']) ? ($debugInfo['json_valid'] ? '✅ Yes' : '❌ No') : 'Unknown'; ?><br>
        
        <?php if (isset($debugInfo['raw_response'])): ?>
        <br><strong style="color: #ffff00;">Raw Response (first 500 chars):</strong><br>
        <div style="background: rgba(255,255,255,0.1); padding: 5px; margin: 5px 0; white-space: pre-wrap; font-size: 10px;">
        <?php echo htmlspecialchars($debugInfo['raw_response']); ?>
        </div>
        <?php endif; ?>
        
        <?php if (isset($debugInfo['decoded_data'])): ?>
        <br><strong style="color: #ffff00;">Decoded Data:</strong><br>
        <div style="background: rgba(255,255,255,0.1); padding: 5px; margin: 5px 0; white-space: pre-wrap; font-size: 10px; max-height: 200px; overflow-y: auto;">
        <?php echo htmlspecialchars(json_encode($debugInfo['decoded_data'], JSON_PRETTY_PRINT)); ?>
        </div>
        <?php endif; ?>
        
        <br><strong style="color: #ffff00;">Extracted Info:</strong><br>
        Avatar URL: <?php echo isset($discordInfo['avatar']) ? htmlspecialchars($discordInfo['avatar']) : '❌ None'; ?><br>
        Username: <?php echo isset($discordInfo['username']) ? htmlspecialchars($discordInfo['username']) : '❌ None'; ?><br>
        Status: <?php echo isset($discordInfo['status']) ? htmlspecialchars($discordInfo['status']) : '❌ None'; ?>
        
        <br><br><strong style="color: #00ffff;">Manual Test:</strong><br>
        <a href="<?php echo isset($debugInfo['url']) ? htmlspecialchars($debugInfo['url']) : '#'; ?>" target="_blank" style="color: #00ffff;">
            Test API directly in browser
        </a>
    </div>
    <?php endif; ?>
</body>
</html>