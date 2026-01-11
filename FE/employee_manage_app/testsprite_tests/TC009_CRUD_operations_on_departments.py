import asyncio
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None
    
    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()
        
        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )
        
        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:4200", wait_until="commit", timeout=10000)
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass
        
        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass
        
        # Interact with the page elements to simulate user flow
        # -> Input admin email and password, then click login.
        frame = context.pages[-1]
        # Input admin email
        elem = frame.locator('xpath=html/body/app-root/app-login/div/nz-card/div/form/nz-form-item/nz-form-control/div/div/nz-input-group/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('admin@gmail.com')
        

        frame = context.pages[-1]
        # Input admin password
        elem = frame.locator('xpath=html/body/app-root/app-login/div/nz-card/div/form/nz-form-item[2]/nz-form-control/div/div/nz-input-group/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('11111111')
        

        frame = context.pages[-1]
        # Click login button
        elem = frame.locator('xpath=html/body/app-root/app-login/div/nz-card/div/form/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click on 'Departments' link in the sidebar or the 'Departments' button in the Employee Management card to navigate to department management.
        frame = context.pages[-1]
        # Click on 'Departments' link in the sidebar to go to department management
        elem = frame.locator('xpath=html/body/app-root/app-main-layout/nz-layout/nz-sider/div/app-sidebar/ul/li[2]/div[2]/ul/li[3]/span/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click the 'Thêm Mới' link at index 11 to open the create department form.
        frame = context.pages[-1]
        # Click the 'Thêm Mới' (Add New) link to open the create department form
        elem = frame.locator('xpath=html/body/app-root/app-main-layout/nz-layout/nz-layout/nz-content/div/app-department-list/div/div/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Input a valid department name, check the activation box if needed, and click the 'Thêm Mới' (Add New) submit button.
        frame = context.pages[-1]
        # Input valid department name
        elem = frame.locator('xpath=html/body/app-root/app-main-layout/nz-layout/nz-layout/nz-content/div/app-department-edit/app-department-form/div/div/div/nz-card/div/form/nz-form-item/nz-form-control/div/div/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('Research and Development')
        

        frame = context.pages[-1]
        # Check the 'Kích Hoạt' (Activate) checkbox if not already checked
        elem = frame.locator('xpath=html/body/app-root/app-main-layout/nz-layout/nz-layout/nz-content/div/app-department-edit/app-department-form/div/div/div/nz-card/div/form/nz-form-item[2]/nz-form-control/div/div/label/span/input').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        frame = context.pages[-1]
        # Click the 'Thêm Mới' (Add New) submit button to create the department
        elem = frame.locator('xpath=html/body/app-root/app-main-layout/nz-layout/nz-layout/nz-content/div/app-department-edit/app-department-form/div/div/div/nz-card/div/form/div/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click the edit button for the 'Research and Development' department to update its details.
        frame = context.pages[-1]
        # Click the edit button for 'Research and Development' department
        elem = frame.locator('xpath=html/body/app-root/app-main-layout/nz-layout/nz-layout/nz-content/div/app-department-list/div/nz-card/div/app-department-table/nz-table/nz-spin/div/div/nz-table-inner-default/div/table/tbody/tr[5]/td[3]/nz-space/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click the edit button for 'Research and Development' department to update its details.
        frame = context.pages[-1]
        # Click the edit button for 'Research and Development' department to open update form
        elem = frame.locator('xpath=html/body/app-root/app-main-layout/nz-layout/nz-layout/nz-content/div/app-department-list/div/nz-card/div/app-department-table/nz-table/nz-spin/div/div/nz-table-inner-default/div/table/tbody/tr[5]/td[3]/nz-space/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Change the department name to 'R&D Department', check the activation box, and click the 'Cập Nhật' (Update) button to save changes.
        frame = context.pages[-1]
        # Update the department name to 'R&D Department'
        elem = frame.locator('xpath=html/body/app-root/app-main-layout/nz-layout/nz-layout/nz-content/div/app-department-edit/app-department-form/div/div/div/nz-card/div/form/nz-form-item/nz-form-control/div/div/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('R&D Department')
        

        frame = context.pages[-1]
        # Check the 'Kích Hoạt' (Activate) checkbox to activate the department
        elem = frame.locator('xpath=html/body/app-root/app-main-layout/nz-layout/nz-layout/nz-content/div/app-department-edit/app-department-form/div/div/div/nz-card/div/form/nz-form-item[2]/nz-form-control/div/div/label/span/input').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        frame = context.pages[-1]
        # Click the 'Cập Nhật' (Update) button to save the updated department details
        elem = frame.locator('xpath=html/body/app-root/app-main-layout/nz-layout/nz-layout/nz-content/div/app-department-edit/app-department-form/div/div/div/nz-card/div/form/div/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Try clicking the delete button for 'R&D Department' at index 21 again or try to trigger deletion by other means.
        frame = context.pages[-1]
        # Retry clicking the delete button for 'R&D Department' to initiate deletion
        elem = frame.locator('xpath=html/body/app-root/app-main-layout/nz-layout/nz-layout/nz-content/div/app-department-list/div/nz-card/div/app-department-table/nz-table/nz-spin/div/div/nz-table-inner-default/div/table/tbody/tr[5]/td[3]/nz-space/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click the 'Có, xóa' (Yes, delete) button to confirm and complete the deletion of the 'R&D Department'.
        frame = context.pages[-1]
        # Click the 'Có, xóa' (Yes, delete) button to confirm deletion
        elem = frame.locator('xpath=html/body/div/div/div[6]/button[3]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=Research and Development').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=R&D Department').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=R&D Department').first).not_to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    